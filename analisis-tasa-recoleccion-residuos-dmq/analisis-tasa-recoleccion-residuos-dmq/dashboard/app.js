let DATA=[],chart;
const sum=(a,k)=>a.reduce((x,y)=>x+Number(y[k]),0);
const money=n=>new Intl.NumberFormat('es-EC',{style:'currency',currency:'USD'}).format(n);
fetch('data.json').then(r=>r.json()).then(d=>{DATA=d;render()});
sector.onchange=render;
function render(){
 const s=sector.value;
 const r=s==='Todos'?DATA:DATA.filter(x=>x.sector===s);
 usuarios.textContent=r.length;
 agua.textContent=money(sum(r,'pago_agua'));
 luz.textContent=money(sum(r,'pago_luz'));
 independiente.textContent=money(sum(r,'pago_independiente'));
 if(chart)chart.destroy();
 chart=new Chart(grafico,{type:'bar',data:{
 labels:['Agua','Electricidad','Independiente'],
 datasets:[{label:'Recaudación mensual simulada',data:[
 sum(r,'pago_agua'),sum(r,'pago_luz'),sum(r,'pago_independiente')
 ]}]},options:{responsive:true}});
}
