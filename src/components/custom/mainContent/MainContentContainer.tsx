"use client";

import { motion } from "framer-motion";
import React, { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import MainContentHeader from "./MainContentHeader";
import { FirestoreError } from "@firebase/firestore";

type Props = {
  children: ReactNode;
  loading: boolean;
  error: FirestoreError | null;
};
export function FlashingBar() {
  return (
    <div className="w-full h-0.5 overflow-hidden relative">
      <motion.div
        className="absolute top-0 left-0 h-0.5 w-1/3 bg-gradient-to-r from-transparent to-secondary-foreground"
        animate={{ x: ["-200%", "400%"] }}
        transition={{
          repeat: Infinity,
          duration: 1.2,
          ease: "linear",
        }}
      />
    </div>
  );
}
function MainContentContainer({ children, loading = false, error }: Props) {
  console.log("maincontentcontainer renderd XXXXXXXX")
  return (
    <div className="h-full">

      <Card className="h-full p-0 py-0 pb-0 m-0 gap-y-0 rounded-none border-none bg-border md:rounded-2xl overflow-hidden flex flex-col shadow-none transition-opacity">

        {loading && <FlashingBar />}
        <CardHeader className="flex flex-row justify-between p-0" style={{ marginTop: 0 }}>
          <MainContentHeader />
        </CardHeader>

        <CardContent className="grow overflow-auto">
          {(error && error.message) &&
            <>
              <CardTitle className={`text-2xl font-bold mt-4 text-red-500`}>Error</CardTitle>
              <p className="text-red-500">{error.message || "Unknown error occured"}</p>
            </>
          }
          {children}
        </CardContent>



      </Card>
    </div>
  );
}

export default MainContentContainer;
