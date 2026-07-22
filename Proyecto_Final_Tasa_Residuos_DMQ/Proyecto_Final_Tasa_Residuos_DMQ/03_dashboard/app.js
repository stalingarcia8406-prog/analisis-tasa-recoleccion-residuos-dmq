let DATA=[], chart1, chart2, chart3;
const sum=(a,k)=>a.reduce((t,x)=>t+Number(x[k]),0);
const avg=(a,k)=>a.length?sum(a,k)/a.length:0;
const money=n=>new Intl.NumberFormat('es-EC',{style:'currency',currency:'USD'}).format(n);
fetch('data.json').then(r=>r.json()).then(d=>{DATA=d;render()});
sector.addEventListener('change',render);
function render(){
 const s=sector.value, r=s==='Todos'?DATA:DATA.filter(x=>x.sector===s);
 usuarios.textContent=r.length;
 agua.textContent=money(sum(r,'pago_agua_usd'));
 luz.textContent=money(sum(r,'pago_luz_usd'));
 independiente.textContent=money(sum(r,'pago_independiente_usd'));
 if(chart1)chart1.destroy();
 chart1=new Chart(graficoEscenarios,{type:'bar',data:{labels:['Agua','Electricidad','Independiente'],datasets:[{label:'Recaudación simulada',data:[sum(r,'pago_agua_usd'),sum(r,'pago_luz_usd'),sum(r,'pago_independiente_usd')]}]},options:{plugins:{legend:{display:false}}}});
 const secs=['Residencial','Comercial','Industrial'];
 if(chart2)chart2.destroy();
 chart2=new Chart(graficoSectores,{type:'bar',data:{labels:secs,datasets:[
 {label:'Agua',data:secs.map(z=>avg(DATA.filter(x=>x.sector===z),'pago_agua_usd'))},
 {label:'Electricidad',data:secs.map(z=>avg(DATA.filter(x=>x.sector===z),'pago_luz_usd'))},
 {label:'Independiente',data:secs.map(z=>avg(DATA.filter(x=>x.sector===z),'pago_independiente_usd'))}
 ]}});
 if(chart3)chart3.destroy();
 chart3=new Chart(graficoRelacion,{type:'scatter',data:{datasets:[
 {label:'Agua',data:r.map(x=>({x:x.residuos_kg_mes,y:x.pago_agua_usd}))},
 {label:'Electricidad',data:r.map(x=>({x:x.residuos_kg_mes,y:x.pago_luz_usd}))},
 {label:'Independiente',data:r.map(x=>({x:x.residuos_kg_mes,y:x.pago_independiente_usd}))}
 ]},options:{scales:{x:{title:{display:true,text:'Residuos kg/mes'}},y:{title:{display:true,text:'Pago USD'}}}}});
}
