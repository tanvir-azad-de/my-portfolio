"use client";

import { useFirestoreCollection } from "@/data/useFirestoreCollection";
import MainContentContainer from "@/components/custom/mainContent/MainContentContainer";
import React from "react";
import Pill from "@/components/custom/pill/Pill";
import MdAccordion from "@/components/custom/accordion/MdAccordion";


function SkillItemWithList({ title, list, subtitle }: Omit<FirestoreDocType, "id">) {
  return (
    <div className="border border-primary/30 rounded-2xl p-4 mb-8">
      <div className="text-left flex flex-col w-full px-0 mb-4">
        <p className="font-bold">{title}</p>
        <p className="opacity-60 text-sm">{subtitle}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {list?.split(',').map((item) => <Pill key={item} text={item} />)}
      </div>
    </div>
  )
}

export default function Skills() {
  const { data, loading, error } = useFirestoreCollection();


  return (
    <MainContentContainer loading={loading} error={error}>
      {data?.map((skill) => {
        return skill?.list ?
          <SkillItemWithList
            key={skill.id}
            title={skill.title}
            list={skill.list}
            subtitle={skill.subtitle}
          />
          :
          <MdAccordion
            key={skill.id}
            image={skill.image}
            title={skill.title}
            subtitle={skill.subtitle}
            content={skill.content}
          />
      })}
    </MainContentContainer>
  );
}
