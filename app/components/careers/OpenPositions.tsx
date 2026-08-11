"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BriefcaseBusiness,
  MapPin,
  Search,
} from "lucide-react";
import { useMemo, useState } from "react";

const jobs = [
  {
    title: "Digital Marketing Intern",
    location: "Remote",
    type: "Full-time",
    department: "Marketing",
  },
  {
    title: "Junior Digital Marketer",
    location: "Remote",
    type: "Full-time",
    department: "Marketing",
  },
  {
    title: "AI Developer",
    location: "Remote",
    type: "Contract",
    department: "Engineering",
  },
  {
    title: "Robotics Engineer",
    location: "Onsite",
    type: "Contract",
    department: "Engineering",
  },
  {
    title: "Data Engineer",
    location: "Onsite",
    type: "Contract",
    department: "Engineering",
  },
  {
    title: "Business Intelligence (BI) Developer",
    location: "Onsite",
    type: "Contract",
    department: "Engineering",
  },
  {
    title: "Prompt Engineer",
    location: "Remote",
    type: "Contract",
    department: "AI",
  },
];

const filters = ["All", "Engineering", "AI", "Marketing"];

export default function OpenPositions() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesFilter =
        filter === "All" || job.department === filter;

      const matchesSearch = job.title
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [filter, search]);

  return (
    <section
      id="open-positions"
      className="relative bg-[#F7FAFF] px-6 py-24 sm:px-8 lg:px-10"
    >
      <div className="mx-auto max-w-6xl">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <span className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600">
            Open Positions
          </span>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-[#14213D] sm:text-4xl lg:text-5xl">
            Find your next
            <br />
            <span className="text-blue-600">opportunity.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-500">
            Explore our current openings and find a role where your skills,
            curiosity and ideas can make an impact.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex flex-wrap gap-2">
            {filters.map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                  filter === item
                    ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                    : "bg-white text-slate-500 hover:bg-blue-50 hover:text-blue-600"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search roles..."
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-4 text-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100 sm:w-56"
            />
          </div>
        </div>

        {/* Jobs */}
        <div className="mt-8 space-y-4">
          {filteredJobs.map((job, index) => (
            <motion.article
              key={job.title}
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.15,
              }}
              transition={{
                duration: 0.45,
                delay: index * 0.05,
              }}
              whileHover={{
                x: 5,
              }}
              className="group flex flex-col gap-5 rounded-2xl border border-white bg-white p-5 shadow-[0_12px_35px_rgba(30,64,175,0.07)] transition-all duration-300 hover:shadow-[0_20px_45px_rgba(37,99,235,0.13)] sm:flex-row sm:items-center sm:justify-between sm:p-6"
            >
              <div>
                <h3 className="text-base font-semibold text-[#17233d] sm:text-lg">
                  {job.title}
                </h3>

                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-medium text-blue-600">
                    <MapPin size={11} />
                    {job.location}
                  </span>

                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-600">
                    <BriefcaseBusiness size={11} />
                    {job.type}
                  </span>
                </div>
              </div>

              <a
                href={`/careers/apply?role=${encodeURIComponent(job.title)}`}
                className="group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(37,99,235,0.22)] transition-all hover:bg-blue-700 hover:shadow-[0_12px_28px_rgba(37,99,235,0.3)]"
              >
                Apply Now

                <ArrowRight
                  size={15}
                  className="transition-transform group-hover/button:translate-x-1"
                />
              </a>
            </motion.article>
          ))}

          {filteredJobs.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-14 text-center">
              <p className="font-semibold text-slate-700">
                No positions found
              </p>

              <p className="mt-2 text-sm text-slate-400">
                Try another search or category.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}