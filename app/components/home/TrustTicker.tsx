"use client";

import { motion } from "framer-motion";


export default function TrustTicker() {


const brands = [
"Aitken Spence",
"Softlogic",
"Sunshine PLC",
"INSEE Cement",
"Hayleys",
"MAS Holdings",
"Brandix",
"DIMO",
];


const duplicatedBrands=[
...brands,
...brands,
...brands
];


return (

<section

className="
relative
overflow-hidden
py-20
bg-gradient-to-br
from-white
via-sky-50
to-indigo-50
"

>


{/* Background Glow */}

<motion.div

animate={{
x:[0,100,0],
y:[0,-40,0]
}}

transition={{
duration:12,
repeat:Infinity
}}

className="
absolute
top-0
left-1/4
w-96
h-96
rounded-full
bg-sky-300/30
blur-[130px]
"

/>



<motion.div

animate={{
x:[0,-80,0],
y:[0,50,0]
}}

transition={{
duration:15,
repeat:Infinity
}}

className="
absolute
bottom-0
right-1/4
w-96
h-96
rounded-full
bg-indigo-300/30
blur-[140px]
"

/>




<div

className="
relative
max-w-7xl
mx-auto
px-6
"

>


{/* Title */}


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
text-center
mb-12
"

>


<p

className="
text-sky-600
uppercase
tracking-[0.35em]
text-xs
font-semibold
"

>

Trusted By

</p>


<h2

className="
mt-4
text-3xl
md:text-4xl
font-bold
text-slate-900
"

>

Industry Leaders
<span

className="
bg-gradient-to-r
from-sky-500
via-indigo-600
to-cyan-500
bg-clip-text
text-transparent
"

>
 Worldwide
</span>

</h2>


</motion.div>







{/* Glass ticker */}


<div

className="
relative
overflow-hidden
rounded-3xl
border
border-white
bg-white/60
backdrop-blur-xl
shadow-[0_25px_80px_rgba(15,23,42,.08)]
py-10
"

>


{/* Moving Shine */}


<motion.div

animate={{

x:["-100%","200%"]

}}

transition={{

duration:6,

repeat:Infinity,

ease:"linear"

}}

className="
absolute
top-0
bottom-0
w-40
bg-gradient-to-r
from-transparent
via-white/60
to-transparent
skew-x-12
"

/>






{/* Left Fade */}


<div

className="
absolute
left-0
top-0
bottom-0
w-32
bg-gradient-to-r
from-white
to-transparent
z-10
"

/>



{/* Right Fade */}


<div

className="
absolute
right-0
top-0
bottom-0
w-32
bg-gradient-to-l
from-white
to-transparent
z-10
"

/>








<motion.div

animate={{

x:["0%","-50%"]

}}

transition={{

duration:30,

repeat:Infinity,

ease:"linear"

}}

className="
flex
gap-8
w-max
items-center
"

>


{
duplicatedBrands.map((brand,index)=>(


<motion.div

key={index}

whileHover={{

y:-8,

scale:1.08

}}

transition={{

type:"spring",

stiffness:250

}}


className="
group
relative
"

>


{/* Glow */}


<div

className="
absolute
inset-0
rounded-2xl
bg-gradient-to-r
from-sky-400
to-indigo-500
opacity-0
group-hover:opacity-30
blur-xl
transition
"

/>





<div

className="
relative
min-w-[180px]
h-20
flex
items-center
justify-center
rounded-2xl
bg-white/80
border
border-slate-200
backdrop-blur-xl
shadow-sm
group-hover:border-sky-300
transition-all
duration-300
"

>


<span

className="
text-slate-700
font-bold
tracking-wide
text-sm
group-hover:text-sky-600
transition
"

>

{brand}

</span>



</div>




</motion.div>


))

}



</motion.div>



</div>






{/* Bottom Statement */}

<motion.p

initial={{
opacity:0
}}

whileInView={{
opacity:1
}}

viewport={{
once:true
}}

className="
mt-10
text-center
text-slate-500
text-sm
"

>

Trusted technology partner for organizations building the digital future.

</motion.p>



</div>


</section>


)

}