
export const processes = [
  { id:'CS', name:'Customer Support', short:'CS' },
  { id:'ACC', name:'Abandoned Cart Conversions', short:'ACC' },
  { id:'RET', name:'Retention', short:'RET' },
  { id:'NDR', name:'NDR Management', short:'NDR' },
];

export const pods = [
  {id:'P1', name:'Northstar Pod', lead:'Aarav Mehta'},
  {id:'P2', name:'Orbit Pod', lead:'Diya Shah'},
  {id:'P3', name:'Pioneer Pod', lead:'Kabir Rao'},
  {id:'P4', name:'Velocity Pod', lead:'Meera Iyer'},
  {id:'P5', name:'Summit Pod', lead:'Rohan Desai'},
];

const first = ['Aarav','Diya','Kabir','Meera','Rohan','Anaya','Ishaan','Sara','Vivaan','Myra','Arjun','Kiara','Reyansh','Aadhya','Advik','Saanvi','Krish','Ira','Atharv','Tara','Dev','Nisha','Veer','Riya','Neil','Mira','Yash','Anika','Dhruv','Avni','Om','Siya'];
const last = ['Mehta','Shah','Rao','Iyer','Desai','Kapoor','Patel','Nair','Joshi','Kulkarni','Malhotra','Pillai','Chopra','Bose','Sethi','Reddy'];
const brandNames = [
  'Morrow & Co','UrbanNest','Glow Theory','Daily Ritual','Petal Pantry',
  'TrailForge','Casa Verde','Loom & Line','Nova Nutrition','Sunday Supply',
  'Kindred Home','Peak Performance','Olive & Oak','Brightside Kids','The Green Shelf',
  'North & Noble','Serein Beauty','Goodgrain','Wander Goods','Little Orchard',
  'Copper Lane','Cloud Nine','Everwell','Field Notes','The Cozy Edit'
];
const brandProcesses = brandNames.map((_,i)=>[
  ['CS','ACC','RET'],['CS','NDR'],['CS','ACC'],['CS','RET'],['CS','ACC','NDR'],
  ['CS','NDR'],['CS','ACC'],['CS','RET'],['CS','ACC','RET','NDR'],['CS','ACC','NDR']
][i%10]);
const operating = ['365','no_holidays','weekdays'];
export function makeSeed() {
  const brands = brandNames.map((name,i)=>({
    id:`B${i+1}`, name, podId:`P${(i%5)+1}`, processes:brandProcesses[i],
    rules:Object.fromEntries(brandProcesses[i].map((proc,j)=>[proc,{
      calendar: i<20 ? 'weekdays' : (i===20 && proc==='CS' ? '365' : 'weekdays'),
      minStaff: (i===20 && proc==='CS') ? 2 : 1
    }]))
  }));
  const employees = first.map((f,i)=>({
    id:`E${String(i+1).padStart(3,'0')}`, name:`${f} ${last[i%last.length]}`,
    email:`${f.toLowerCase()}.${last[i%last.length].toLowerCase()}@rosterly.demo`,
    podId:`P${(i%5)+1}`, role:i%7===0?'Pod Coordinator':'Operations Associate',
    weeklyOff:i===20?'Sat':i===22?'Tue':'Sun',
    active:true
  }));
  const assignments = [];
  // 20 of 25 brands (80%) have one dedicated employee across their processes.
  for(let b=0;b<20;b++){
    const e=employees[b];
    brands[b].processes.forEach(proc=>assignments.push({id:`A${assignments.length+1}`,employeeId:e.id,brandId:brands[b].id,processId:proc}));
  }
  // The remaining five brands have 2–3 people, with separate and overlapping process ownership.
  const multiGroups=[[employees[20],employees[21],employees[22]],[employees[23],employees[24],employees[25]],[employees[26],employees[27]],[employees[28],employees[29]],[employees[30],employees[31]]];
  multiGroups.forEach((group,idx)=>{
    const brand=brands[20+idx], procs=brand.processes;
    group.forEach((emp,j)=>{
      const proc=procs[j%procs.length];
      assignments.push({id:`A${assignments.length+1}`,employeeId:emp.id,brandId:brand.id,processId:proc});
    });
    // Add cross-trained backup coverage for every process, avoiding uncovered weekly offs.
    if(group.length>=2) assignments.push({id:`A${assignments.length+1}`,employeeId:group[1].id,brandId:brand.id,processId:procs[0]});
    procs.forEach((proc,j)=>{
      const owners=assignments.filter(a=>a.brandId===brand.id&&a.processId===proc);
      const target=(brand.rules[proc]?.minStaff||1)+1;
      if(owners.length<target){
        const backup=group.find(emp=>!owners.some(a=>a.employeeId===emp.id));
        if(backup) assignments.push({id:`A${assignments.length+1}`,employeeId:backup.id,brandId:brand.id,processId:proc});
      }
    });
  });
  const leaves = [
    {id:'L1',employeeId:'E001',date:'2026-11-24',type:'Planned Leave',status:'Approved',reason:'Personal'},
    {id:'L2',employeeId:'E009',date:'2026-11-26',type:'Comp-off',status:'Approved',reason:'Weekend coverage'},
    {id:'L3',employeeId:'E015',date:'2026-11-18',type:'Planned Leave',status:'Approved',reason:'Personal'},
    {id:'L4',employeeId:'E023',date:'2026-11-27',type:'Planned Leave',status:'Pending',reason:'Family event'},
    {id:'L5',employeeId:'E003',date:'2026-11-29',type:'Planned Leave',status:'Approved',reason:'Personal'}
  ];
  const holidays = [
    {id:'H1',date:'2026-11-08',name:'Regional Holiday'},
    {id:'H2',date:'2026-11-14',name:'Festival Holiday'}
  ];
  return {employees,brands,assignments,leaves,holidays,pods};
}
