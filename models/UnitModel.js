const VILLAGER={name:"villager",health:10,range:2,damage:1,movement:1},CAVALRY={name:"cavalry",health:15,range:2,damage:5,movement:3};class Unit{constructor(e,t,s,i){this.owner=e,this.name=t.name,this.health=t.health,this.range=t.range,this.damage=t.damage,this.movement=t.movement,this.coord=s,this.movable_events=[],this.attackable_events=[],this.selectable_events=[],this.moved=!1,this.attacked=!1,this.selected=!1,this.destroyed=!1,this.AI_behaviour=i}movementRangeSquares(){let e=[],t=calculateBounds(this.coord[0],this.movement),s=calculateBounds(this.coord[1],this.movement);for(let i=t[0];i<=t[1];i++)for(let o=s[0];o<=s[1];o++)e.push([i,o]);return e}calculatePossibleMoves(){if(!1===this.moved){let e=this.movementRangeSquares(),t=[];return e.forEach(e=>{controller.checkMovable(e)&&e.toString()!=this.coord.toString()&&t.push(e)}),t}}calculatePossibleAttacks(){let e=[];if(!1===this.attacked){let t=calculateBounds(this.coord[0],this.range),s=calculateBounds(this.coord[1],this.range);for(let i=t[0];i<=t[1];i++)for(let o=s[0];o<=s[1];o++){let r=[i,o],a;a="player"===this.owner?"computer":"player",void 0!==getEntityAt(r)&&getEntityAt(r).owner===a&&e.push(r)}}return e}calculatePossibleBuilds(e){alert("Future Feature")}move(e){this.coord=e,this.moved=!0,controller.updateTakenSpots()}resetMovement(){this.moved=!1,this.attacked=!1}attack(e){let t=getEntityAt(e);console.log(t.health),t.health-=this.damage,console.log(t.health),t.health<=0&&(t.destroySelf(),controller.updateTakenSpots()),this.attacked=!0,removeActionOverlay("attackable"),removeActionOverlay("movable"),controller.refreshEvents()}toggleSelection(){this.selected=!this.selected}findClosestPath(e){let t=this.calculatePossibleMoves();if(t.includes(e))controller.view.eraseUnit(this,this.owner),this.move(e),controller.view.drawUnit(this,this.owner);else{let s=26,i=26,o,r;t.forEach(t=>{Math.abs(e[1]-t[1])<i&&(i=Math.abs(e[1]-t[1]),r=t[1])}),t.forEach(t=>{t[1]===r&&Math.abs(e[0]-t[0])<s&&(s=Math.abs(e[0]-t[0]),o=t[0])}),controller.view.eraseUnit(this,this.owner),this.move([o,r]),controller.view.drawUnit(this,this.owner)}}build(e,t,s){let i=new Building(this.owner,e,t);controller.view.displayBuilding(i),"player"===this.owner&&controller.player.buildings.push(new Building("player",e,t)),"computer"===this.owner&&controller.computer.buildings.push(new Building("computer",e,t,s))}findClosestEnemy(){let e=26,t=controller.player.units[0];return controller.player.units.forEach(s=>{s.coord[0],this.coord[0];let i=s.coord[1]-this.coord[1];i<e&&(e=i,t=s)}),t.coord}destroySelf(){if("player"===this.owner){for(let[e,t]of controller.player.units.entries())if(t===this&&!1===this.destroyed){controller.player.units.splice(e,1),controller.view.eraseUnit(this,this.owner),this.destroyed=!0;return}}if("computer"===this.owner){for(let[s,i]of controller.computer.units.entries())if(i===this&&!1===this.destroyed){controller.computer.units.splice(s,1),controller.view.eraseUnit(this,this.owner),this.destroyed=!0;return}}}}