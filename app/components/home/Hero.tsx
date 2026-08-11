"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Database,
  Brain,
  ShoppingCart,
  Smartphone,
  Cloud,
  ArrowUpRight,
} from "lucide-react";

import Image from "next/image";
import HeroBackground from "./HeroBackground";


export default function Hero() {

  const handleScroll = (id:string)=>{
    const element=document.getElementById(id);

    if(element){
      element.scrollIntoView({
        behavior:"smooth"
      });
    }
  };


  const services=[
    {
      name:"ERP System",
      icon:<Database className="w-4 h-4 text-sky-600"/>,
      angle:0
    },
    {
      name:"AI Analytics",
      icon:<Brain className="w-4 h-4 text-sky-600"/>,
      angle:72
    },
    {
      name:"POS System",
      icon:<ShoppingCart className="w-4 h-4 text-sky-600"/>,
      angle:144
    },
    {
      name:"Mobile App",
      icon:<Smartphone className="w-4 h-4 text-sky-600"/>,
      angle:216
    },
    {
      name:"Cloud Infra",
      icon:<Cloud className="w-4 h-4 text-sky-600"/>,
      angle:288
    },
  ];



return (

<section
className="
relative

min-h-screen

pt-32
pb-20

flex
items-center
justify-center


bg-gradient-to-br

from-white
via-sky-50
to-indigo-50


overflow-hidden
"
>


<HeroBackground />



{/* Ambient Glow */}

<div
className="
absolute

top-1/4
left-1/4

-translate-x-1/2
-translate-y-1/2


w-96
h-96


bg-sky-300/30


rounded-full

blur-[140px]

pointer-events-none
"
/>



<div
className="
absolute

bottom-1/4
right-1/4

translate-x-1/2
translate-y-1/2


w-96
h-96


bg-indigo-300/30


rounded-full

blur-[140px]

pointer-events-none
"
/>





{/* Dot Grid */}

<div
className="
absolute
inset-0

opacity-[0.08]

pointer-events-none
"
style={{
backgroundImage:
`radial-gradient(circle at 1px 1px,#0ea5e9 1px,transparent 0)`,

backgroundSize:"24px 24px"
}}
/>





<div
className="
max-w-7xl

mx-auto

px-6


grid

grid-cols-1

lg:grid-cols-12

gap-12

items-center

relative

z-10

w-full
"
>



{/* LEFT CONTENT */}

<div
className="
lg:col-span-6

space-y-8

text-center

lg:text-left
"
>



{/* Badge */}

<motion.div

initial={{
opacity:0,
y:20
}}

animate={{
opacity:1,
y:0
}}

transition={{
duration:.6
}}

className="
inline-flex

items-center

gap-2

px-3

py-1

rounded-full

bg-sky-100

border

border-sky-200


text-sky-700

text-xs

font-medium
"

>

<span
className="
w-2
h-2

rounded-full

bg-sky-500

animate-pulse
"
/>

Software, AI & Innovation

</motion.div>






<div
className="
space-y-4
"
>


<motion.h1

initial={{
opacity:0,
y:20
}}

animate={{
opacity:1,
y:0
}}

transition={{
duration:.6,
delay:.1
}}

className="
font-display

font-extrabold

text-4xl

sm:text-5xl

md:text-6xl


text-slate-900


tracking-tight

leading-[1.05]
"

>


Smart Software Built for

<br/>


<span

className="
bg-clip-text

text-transparent


bg-gradient-to-r

from-sky-500

via-indigo-600

to-sky-500


bg-[length:200%_auto]


animate-[pulse_6s_linear_infinite]
"

>

Growing Businesses

</span>


</motion.h1>





<motion.p

initial={{
opacity:0,
y:20
}}

animate={{
opacity:1,
y:0
}}

transition={{
duration:.6,
delay:.2
}}

className="
text-slate-600

text-base

sm:text-lg

md:text-xl

leading-relaxed

max-w-xl

mx-auto

lg:mx-0
"

>

We build ERP systems, AI solutions and business software that help retailers, factories and enterprises work faster and scale effortlessly.

</motion.p>


</div>
        {/* ACTION BUTTONS */}

<motion.div

initial={{
opacity:0,
y:20
}}

animate={{
opacity:1,
y:0
}}

transition={{
duration:.6,
delay:.3
}}

className="
flex

flex-col

sm:flex-row

items-center

justify-center

lg:justify-start

gap-4
"

>


<button

onClick={()=>handleScroll("scheduler")}

className="
w-full

sm:w-auto

px-8

py-4


rounded-full


bg-gradient-to-r

from-sky-500

to-cyan-400


text-white


font-semibold


transition-all


duration-300


hover:-translate-y-1


hover:shadow-[0_15px_40px_rgba(14,165,233,.35)]


flex

items-center

justify-center

gap-2


cursor-pointer
"

>

Book a Demo

<ArrowRight className="w-4 h-4"/>

</button>






<button

onClick={()=>handleScroll("solutions")}

className="
w-full

sm:w-auto


px-8

py-4


rounded-full


bg-white


border

border-slate-200


text-slate-800


font-semibold


shadow-sm


transition-all


duration-300


hover:bg-slate-50


hover:-translate-y-1


flex

items-center

justify-center

gap-2


cursor-pointer
"

>


Explore Solutions


<ArrowUpRight
className="
w-4

h-4

text-slate-500
"
/>


</button>



</motion.div>







{/* TRUST STATS */}


<motion.div

initial={{
opacity:0
}}

animate={{
opacity:1
}}

transition={{
duration:.8,
delay:.4
}}

className="
pt-6

border-t

border-slate-200


flex

flex-wrap

items-center

justify-center

lg:justify-start


gap-8
"

>


<div
className="
text-center

lg:text-left
"
>

<p
className="
text-2xl

font-bold

text-slate-900
"
>
250+
</p>


<p
className="
text-xs

text-slate-500

font-medium

uppercase

tracking-wider
"
>
Projects Completed
</p>


</div>





<div
className="
w-px

h-8

bg-slate-300

hidden

sm:block
"
/>





<div
className="
text-center

lg:text-left
"
>

<p
className="
text-2xl

font-bold

text-slate-900
"
>

98%

</p>


<p
className="
text-xs

text-slate-500

font-medium

uppercase

tracking-wider
"
>

Customer Satisfaction

</p>


</div>





<div
className="
w-px

h-8

bg-slate-300

hidden

sm:block
"
/>





<div
className="
text-center

lg:text-left
"
>

<p
className="
text-2xl

font-bold

text-slate-900
"
>

10+

</p>


<p
className="
text-xs

text-slate-500

font-medium

uppercase

tracking-wider
"
>

Years of Innovation

</p>


</div>



</motion.div>



</div>






{/* RIGHT ORBIT SYSTEM */}


<div

className="
lg:col-span-6


relative


flex


items-center


justify-center


min-h-[480px]


lg:min-h-[560px]
"

>


<motion.div

variants={orbitVariants}

animate="animate"


className="
relative


w-80

h-80


sm:w-[420px]

sm:h-[420px]


rounded-full


border

border-sky-200


bg-white/40


backdrop-blur-xl


shadow-[0_20px_80px_rgba(14,165,233,.15)]


flex


items-center


justify-center
"

>




{/* Orbit Line */}


<svg

className="
absolute

inset-0

w-full

h-full

-rotate-90

pointer-events-none

opacity-40
"

>

<circle

cx="50%"

cy="50%"

r="48%"


fill="none"


stroke="#0EA5E9"


strokeWidth="1"


strokeDasharray="6,12"

/>

</svg>







{/* SERVICE CARDS */}


{
services.map((item,idx)=>{


const radius=195;


const radian=
(item.angle*Math.PI)/180;


const x=Math.cos(radian)*radius;

const y=Math.sin(radian)*radius;



return (


<div

key={idx}

className="absolute"

style={{
transform:`translate(${x}px,${y}px)`
}}

>


<motion.div

variants={cardVariants}

animate="animate"


whileHover={{
scale:1.1
}}


className="
p-3.5


rounded-xl


bg-white/90


backdrop-blur-xl


border

border-slate-200


shadow-[0_10px_30px_rgba(15,23,42,.08)]


flex

items-center


gap-3


w-40


hover:border-sky-300


hover:shadow-[0_0_25px_rgba(14,165,233,.25)]


transition-all

duration-300
"

>



<div

className="
p-2

rounded-lg


bg-sky-50


border

border-sky-100
"

>

{item.icon}

</div>





<span

className="
font-semibold

text-xs

text-slate-800

tracking-wide
"

>

{item.name}

</span>



</motion.div>


</div>


)


})

}


</motion.div>
        {/* CENTRAL AI CORE */}

        <div
          className="
          absolute

          w-32
          h-32

          sm:w-40
          sm:h-40


          rounded-full


          bg-white


          border

          border-sky-200


          flex

          items-center

          justify-center


          shadow-[0_0_80px_rgba(14,165,233,.25)]


          backdrop-blur-xl


          select-none
          "
        >



          {/* Inner Glow */}

          <motion.div

          animate={{
            scale:[1,1.15,1],
            opacity:[0.35,0.7,0.35]
          }}

          transition={{
            duration:4,
            repeat:Infinity
          }}

          className="
          absolute

          inset-3


          rounded-full


          bg-gradient-to-tr


          from-sky-300/40

          via-blue-300/30

          to-indigo-300/40


          blur-xl
          "

          />





          {/* Logo Circle */}


          <div

          className="
          relative

          z-10


          w-20

          h-20


          sm:w-24

          sm:h-24


          rounded-full


          bg-white/80


          border

          border-sky-200


          backdrop-blur-md


          shadow-[0_0_40px_rgba(14,165,233,.25)]


          flex

          items-center

          justify-center
          "

          >


          <Image

          src="/images/logo.png"

          alt="Neirah Tech"

          width={90}

          height={90}

          priority


          className="
          w-16

          h-16


          sm:w-20

          sm:h-20


          object-contain


          drop-shadow-[0_0_20px_rgba(14,165,233,.45)]
          "

          />


          </div>







          {/* Rotating Blue Ring */}


          <motion.div

          animate={{
            rotate:360
          }}

          transition={{
            duration:12,

            repeat:Infinity,

            ease:"linear"
          }}

          className="
          absolute


          -inset-4


          rounded-full


          border

          border-sky-300/50
          "

          />






          {/* Rotating Purple Ring */}


          <motion.div

          animate={{
            rotate:-360
          }}

          transition={{
            duration:20,

            repeat:Infinity,

            ease:"linear"
          }}

          className="
          absolute


          -inset-8


          rounded-full


          border

          border-indigo-300/40
          "

          />







          {/* Floating Nodes */}


          <div

          className="
          absolute


          -inset-[45px]


          rounded-full


          border

          border-dashed


          border-sky-300/40


          animate-spin


          [animation-duration:15s]
          "

          />


        </div>


      </div>


    </div>


  </section>


);

}





// ORBIT ANIMATION

const orbitVariants={

animate:{

rotate:360,


transition:{

duration:40,

ease:"linear" as const,

repeat:Infinity

}

}

};





// CARD COUNTER ROTATION

const cardVariants={

animate:{

rotate:-360,


transition:{

duration:40,

ease:"linear" as const,

repeat:Infinity

}

}

};