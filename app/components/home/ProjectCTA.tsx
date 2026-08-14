"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Check,
} from "lucide-react";
import Link from "next/link";


const benefits = [
  "Custom Software",
  "AI Solutions",
  "Enterprise Systems",
];



export default function ProjectCTA() {


return (

<section

className="
relative
overflow-hidden
py-32
bg-gradient-to-br
from-white
via-sky-50
to-indigo-50
"

>



{/* ======================
    BACKGROUND LIGHTS
====================== */}



<motion.div

animate={{

x:[0,80,0],

y:[0,-50,0],

scale:[1,1.2,1]

}}

transition={{

duration:12,

repeat:Infinity,

ease:"easeInOut"

}}

className="
absolute
top-20
left-1/4
w-[420px]
h-[420px]
rounded-full
bg-sky-300/30
blur-[150px]
"

/>





<motion.div

animate={{

x:[0,-80,0],

y:[0,50,0],

scale:[1.2,1,1.2]

}}

transition={{

duration:14,

repeat:Infinity,

ease:"easeInOut"

}}

className="
absolute
bottom-0
right-1/4
w-[450px]
h-[450px]
rounded-full
bg-indigo-300/30
blur-[160px]
"

/>









{/* ======================
    GRID
====================== */}



<div

className="
absolute
inset-0
opacity-[0.05]
"

style={{

backgroundImage:

"radial-gradient(circle at 1px 1px,#0ea5e9 1px,transparent 1px)",


backgroundSize:"28px 28px"

}}

/>








<div

className="
relative
max-w-6xl
mx-auto
px-6
"

>




{/* ======================
      MAIN CARD
====================== */}



<motion.div


initial={{

opacity:0,

y:60,

scale:.95

}}


whileInView={{

opacity:1,

y:0,

scale:1

}}


viewport={{

once:true

}}


transition={{

duration:.9,

ease:[0.22,1,0.36,1]

}}



className="
relative
overflow-hidden
rounded-[50px]
bg-white/70
backdrop-blur-2xl
border
border-white
shadow-[0_40px_120px_rgba(15,23,42,.12)]
px-8
py-20
md:px-20
"

>







{/* ======================
     ROTATING RINGS
====================== */}




<motion.div


animate={{

rotate:360

}}


transition={{

duration:40,

repeat:Infinity,

ease:"linear"

}}



className="
absolute
w-[450px]
h-[450px]
rounded-full
border
border-sky-300/30
top-1/2
left-1/2
"

style={{

translateX:"-50%",

translateY:"-50%"

}}

/>







<motion.div


animate={{

rotate:-360

}}


transition={{

duration:55,

repeat:Infinity,

ease:"linear"

}}



className="
absolute
w-[650px]
h-[650px]
rounded-full
border
border-indigo-300/20
top-1/2
left-1/2
"

style={{

translateX:"-50%",

translateY:"-50%"

}}

/>









{/* ======================
      FLOATING DOTS
====================== */}



{
[
{
x:"15%",
y:"20%"
},
{
x:"80%",
y:"30%"
},
{
x:"20%",
y:"80%"
},
{
x:"75%",
y:"75%"
}

].map((dot,index)=>(


<motion.span

key={index}

animate={{

y:[0,-20,0],

opacity:[.3,1,.3]

}}

transition={{

duration:3+index,

repeat:Infinity,

ease:"easeInOut"

}}


style={{

left:dot.x,

top:dot.y

}}



className="
absolute
w-2
h-2
rounded-full
bg-sky-400
"

>


</motion.span>


))

}








{/* ======================
       CONTENT
====================== */}



<div

className="
relative
z-10
text-center
"

>




<motion.div


initial={{

opacity:0,

y:20

}}


whileInView={{

opacity:1,

y:0

}}


viewport={{

once:true

}}



className="
inline-flex
items-center
gap-2
px-5
py-2
rounded-full
bg-sky-100
border
border-sky-200
text-sky-700
text-sm
font-semibold
"

>

<Sparkles size={16}/>

Let's Build Something Amazing

</motion.div>









<motion.h2


initial={{

opacity:0,

y:30

}}


whileInView={{

opacity:1,

y:0

}}


viewport={{

once:true

}}


transition={{

delay:.15

}}



className="
mt-8
text-4xl
sm:text-5xl
md:text-6xl
font-black
leading-tight
text-slate-900
"

>


Ready to Start Your


<span

className="
block
bg-gradient-to-r
from-sky-500
via-indigo-600
to-cyan-500
bg-clip-text
text-transparent
"

>

Next Project?

</span>


</motion.h2>








<motion.p


initial={{

opacity:0,

y:20

}}


whileInView={{

opacity:1,

y:0

}}



viewport={{

once:true

}}



transition={{

delay:.25

}}



className="
mt-6
max-w-2xl
mx-auto
text-lg
leading-relaxed
text-slate-600
"

>

Have an idea?
Let's transform it into a powerful digital solution
with modern software, AI, cloud and automation.

</motion.p>









{/* BUTTONS */}



<motion.div


initial={{

opacity:0,

y:20

}}


whileInView={{

opacity:1,

y:0

}}


viewport={{

once:true

}}



transition={{

delay:.35

}}



className="
mt-10
flex
flex-col
sm:flex-row
justify-center
gap-5
"

>


<Link href="/services">
<button

className="
group
relative
overflow-hidden
px-9
py-4
rounded-full
bg-gradient-to-r
from-sky-500
to-cyan-400
text-white
font-bold
shadow-[0_20px_50px_rgba(14,165,233,.35)]
hover:-translate-y-1
transition
flex
items-center
justify-center
gap-3
"

>


<span
className="
absolute
inset-0
bg-white/20
translate-x-[-100%]
group-hover:translate-x-[100%]
transition-transform
duration-700
"
/>


<span className="relative">

Start Your Project

</span>


<ArrowRight

size={18}

className="
relative
group-hover:translate-x-1
transition
"

/>


</button>

</Link>



<Link href="#hero">
<button

className="
px-9
py-4
rounded-full
bg-white
border
border-slate-200
text-slate-800
font-bold
hover:bg-slate-50
hover:-translate-y-1
transition
"

>

Book Consultation

</button>
</Link>

</motion.div>









{/* BENEFITS */}



<div

className="
mt-12
flex
flex-wrap
justify-center
gap-6
"

>


{
benefits.map((item)=>(


<div

key={item}

className="
flex
items-center
gap-2
text-sm
text-slate-500
"

>


<div

className="
w-5
h-5
rounded-full
bg-sky-100
flex
items-center
justify-center
"

>

<Check

size={12}

className="text-sky-600"

/>

</div>


{item}


</div>


))

}


</div>





</div>





</motion.div>






</div>





</section>


)

}