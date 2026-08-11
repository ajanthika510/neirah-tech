"use client";

import { motion } from "framer-motion";



const particles = [

{
x:"10%",
y:"20%",
size:3
},

{
x:"20%",
y:"70%",
size:4
},

{
x:"35%",
y:"40%",
size:2
},

{
x:"50%",
y:"75%",
size:3
},

{
x:"65%",
y:"25%",
size:4
},

{
x:"78%",
y:"60%",
size:3
},

{
x:"90%",
y:"35%",
size:2
}

];






const bubbles=[

{
size:220,
left:"5%",
top:"20%"
},


{
size:150,
right:"12%",
top:"30%"
},


{
size:260,
right:"15%",
bottom:"5%"
}


];









const aiNodes=[

{
x:"18%",
y:"35%"
},

{
x:"35%",
y:"65%"
},

{
x:"55%",
y:"25%"
},

{
x:"72%",
y:"55%"
},

{
x:"85%",
y:"35%"
}

];









export default function HeroBackground(){


return(


<div

className="

absolute

inset-0


overflow-hidden


pointer-events-none

"

>








{/* =========================
        LIGHT AI BASE
========================= */}


<div

className="

absolute


inset-0



bg-gradient-to-br


from-white


via-sky-50


to-indigo-50

"

/>









{/* =========================
        AI AURORA FIELD
========================= */}



<motion.div


animate={{

scale:[1,1.15,1],

rotate:[0,8,0]

}}


transition={{


duration:35,


repeat:Infinity,


ease:"easeInOut"


}}



className="

absolute


inset-[-20%]

"

style={{


background:`

radial-gradient(

circle at 15% 20%,


rgba(14,165,233,.25),


transparent 35%


),


radial-gradient(

circle at 85% 20%,


rgba(59,130,246,.22),


transparent 35%


),


radial-gradient(

circle at 80% 80%,


rgba(139,92,246,.18),


transparent 40%

)

`

}}


/>









{/* =========================
        CYAN AI ENERGY BLOB
========================= */}



<motion.div


animate={{


x:[0,120,-60,0],


y:[0,-50,60,0],


scale:[1,1.25,.9,1]


}}



transition={{


duration:22,


repeat:Infinity,


ease:"easeInOut"


}}



className="

absolute


-left-[180px]


top-20



w-[600px]


h-[600px]



rounded-full



bg-cyan-300/30



blur-[180px]

"

/>













{/* =========================
        INDIGO AI ENERGY
========================= */}



<motion.div


animate={{


x:[0,-100,50,0],


y:[0,70,-40,0],


scale:[1,.85,1.2,1]


}}


transition={{


duration:26,


repeat:Infinity,


ease:"easeInOut"


}}




className="

absolute


-right-[180px]



bottom-0



w-[650px]


h-[650px]



rounded-full



bg-indigo-300/25



blur-[200px]

"

/>












{/* =========================
        CENTRAL AI CORE BLOB
========================= */}



<motion.div


animate={{


scale:[1,1.15,1],


rotate:[0,180,360]


}}



transition={{


duration:50,


repeat:Infinity,


ease:"linear"


}}



className="

absolute



left-1/2


top-1/2



-translate-x-1/2


-translate-y-1/2




w-[420px]


h-[420px]



rounded-[45%]



bg-gradient-to-br



from-cyan-400/20



via-blue-500/20



to-purple-500/20



blur-3xl


"

/>









{/* =========================
        AI ORBIT RING
========================= */}



<motion.div


animate={{


rotate:360


}}



transition={{


duration:70,


repeat:Infinity,


ease:"linear"


}}




className="

absolute


left-1/2


top-1/2



-translate-x-1/2


-translate-y-1/2



w-[750px]


h-[750px]



rounded-full



border


border-sky-300/30

"

/>







<motion.div


animate={{


rotate:-360


}}



transition={{


duration:100,


repeat:Infinity,


ease:"linear"


}}



className="

absolute


left-1/2


top-1/2



-translate-x-1/2


-translate-y-1/2



w-[1000px]


h-[1000px]



rounded-full



border


border-indigo-300/30


"

/>






{/* =========================
        AI NEURAL NETWORK LINES
========================= */}



<svg

className="

absolute

inset-0

w-full

h-full


opacity-30

"

>


<defs>


<linearGradient id="aiNetwork">


<stop

offset="0%"

stopColor="#06B6D4"

/>


<stop

offset="50%"

stopColor="#3B82F6"

/>


<stop

offset="100%"

stopColor="#8B5CF6"

/>


</linearGradient>



</defs>







<motion.path



d="

M100 500

C300 300

500 600

700 350

S1100 250

1400 450

"



fill="none"



stroke="url(#aiNetwork)"



strokeWidth="2"



strokeDasharray="8 16"




animate={{


strokeDashoffset:[0,-300]


}}



transition={{


duration:14,


repeat:Infinity,


ease:"linear"


}}


/>









<motion.path



d="

M200 200

C500 450

800 150

1200 400

S1600 200

2000 350

"



fill="none"



stroke="url(#aiNetwork)"



strokeWidth="1.5"



strokeDasharray="10 20"




animate={{


strokeDashoffset:[0,300]


}}



transition={{


duration:18,


repeat:Infinity,


ease:"linear"


}}


/>





</svg>









{/* =========================
        AI CONNECTION DOTS
========================= */}



{

aiNodes.map((node,index)=>(



<motion.div


key={index}



className="

absolute



w-3


h-3



rounded-full



bg-cyan-400



shadow-[0_0_35px_rgba(34,211,238,.9)]

"



style={{


left:node.x,


top:node.y


}}




animate={{


scale:[1,1.8,1],


opacity:[.3,1,.3]


}}



transition={{


duration:3+index,


repeat:Infinity,


delay:index*.5


}}



/>



))

}













{/* =========================
        AI DATA STREAMS
========================= */}



{


Array.from({

length:8

}).map((_,index)=>(



<motion.div


key={index}



className="

absolute



h-[2px]



w-28



bg-gradient-to-r



from-transparent



via-cyan-400



to-transparent



blur-sm

"



style={{


top:`${20+index*8}%`


}}



animate={{


x:[

"-200px",

"120vw"

]


}}



transition={{


duration:12+index,


repeat:Infinity,


ease:"linear",


delay:index


}}



/>


))


}













{/* =========================
        AI CIRCUIT GRID
========================= */}



<div


className="

absolute


right-[15%]


top-[25%]



w-48


h-48



opacity-40

"

>


{

Array.from({

length:16

}).map((_,index)=>(


<motion.div


key={index}



className="

absolute



w-2


h-2



rounded-full



bg-blue-500



shadow-[0_0_15px_rgba(59,130,246,.8)]

"



style={{


left:`${(index%4)*35}px`,


top:`${Math.floor(index/4)*35}px`


}}



animate={{


opacity:[.2,1,.2],


scale:[1,1.5,1]


}}



transition={{


duration:2,


repeat:Infinity,


delay:index*.12


}}


/>


))

}


</div>













{/* =========================
        AI FLOWING PARTICLES
========================= */}



{

particles.map((p,index)=>(



<motion.div


key={index}



className="

absolute



rounded-full



bg-sky-500



shadow-[0_0_25px_rgba(14,165,233,.8)]

"



style={{


left:p.x,


top:p.y,


width:p.size,


height:p.size


}}



animate={{


y:[0,-60,0],


opacity:[.2,1,.2],


scale:[1,1.4,1]


}}



transition={{


duration:4+index,


repeat:Infinity


}}



/>


))

}













{/* =========================
        GLASS AI BUBBLES
========================= */}



{


bubbles.map((bubble,index)=>(



<motion.div


key={index}



animate={{


y:[0,-30,0],


scale:[1,1.05,1]


}}



transition={{


duration:8+index*2,


repeat:Infinity


}}



className="

absolute



rounded-full



border



border-sky-200/50



bg-white/30



backdrop-blur-3xl



shadow-[0_20px_60px_rgba(14,165,233,.15)]

"



style={{


width:bubble.size,


height:bubble.size,


...bubble


}}


/>


))


}







{/* =========================
        AI HOLOGRAM GRID
========================= */}



<div


className="

absolute


inset-0



opacity-[0.08]

"

style={{


backgroundImage:`


linear-gradient(

rgba(14,165,233,.25) 1px,

transparent 1px

),



linear-gradient(

90deg,

rgba(14,165,233,.25) 1px,

transparent 1px

)



`,



backgroundSize:"70px 70px"


}}


/>









{/* =========================
        AI LIGHT BEAMS
========================= */}



{


[20,45,70].map((x,index)=>(


<motion.div



key={index}



animate={{


opacity:[.05,.3,.05]


}}



transition={{


duration:5+index,


repeat:Infinity


}}




className="

absolute



top-0



h-full



w-px



bg-gradient-to-b



from-transparent



via-cyan-400



to-transparent



blur-sm

"



style={{


left:`${x}%`


}}


/>



))


}














{/* =========================
        MOVING AI LASER SCAN
========================= */}



<motion.div



animate={{


x:[

"-100%",

"200%"

]

}}



transition={{


duration:10,


repeat:Infinity,


ease:"linear"


}}




className="

absolute



top-1/3



h-px



w-[550px]



bg-gradient-to-r



from-transparent



via-cyan-400



to-transparent



blur-sm

"

/>













{/* =========================
        FLOATING AI SIGNAL WAVES
========================= */}



<motion.div



animate={{


scale:[1,1.2,1],


opacity:[.1,.35,.1]


}}



transition={{


duration:6,


repeat:Infinity


}}



className="

absolute



left-1/2



top-1/2



-translate-x-1/2



-translate-y-1/2



w-[520px]



h-[520px]



rounded-full



border



border-cyan-400/20



blur-sm

"

/>







<motion.div



animate={{


scale:[1.2,1,1.2],


opacity:[.05,.25,.05]


}}



transition={{


duration:8,


repeat:Infinity


}}



className="

absolute



left-1/2



top-1/2



-translate-x-1/2



-translate-y-1/2



w-[650px]



h-[650px]



rounded-full



border



border-indigo-400/20



blur-sm

"

/>












{/* =========================
        AI CONNECTION PATH
========================= */}



<svg



className="

absolute



inset-0



w-full



h-full



opacity-30

"



>


<defs>


<linearGradient id="flowLine">


<stop

offset="0%"

stopColor="#22D3EE"

/>


<stop

offset="50%"

stopColor="#3B82F6"

/>


<stop

offset="100%"

stopColor="#A855F7"

/>


</linearGradient>



</defs>





<motion.path


d="

M0 600

C400 300

800 700

1300 350

C1700 100

2000 500

2400 250

"



fill="none"



stroke="url(#flowLine)"



strokeWidth="2"



strokeDasharray="15 20"



animate={{


strokeDashoffset:[0,-400]


}}



transition={{


duration:20,


repeat:Infinity,


ease:"linear"


}}


/>



</svg>













{/* =========================
        AI PARTICLE BURSTS
========================= */}



{

Array.from({

length:12

}).map((_,index)=>(


<motion.span


key={index}



className="

absolute



w-1



h-1



rounded-full



bg-indigo-500



shadow-[0_0_15px_rgba(99,102,241,.9)]

"



style={{


left:`${10+index*7}%`,


top:`${35+(index%4)*10}%`


}}



animate={{


y:[0,-40,0],


opacity:[0,1,0]


}}



transition={{


duration:3+index*.3,


repeat:Infinity,


delay:index*.2


}}


/>



))


}














{/* =========================
        SOFT AI VIGNETTE
========================= */}



<div



className="

absolute



inset-0



bg-[radial-gradient(circle,transparent_40%,rgba(255,255,255,.75)_100%)]

"



/>








</div>


);


}