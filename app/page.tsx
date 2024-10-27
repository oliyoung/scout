'use client'
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import ReportComponent from '@/components/reports/report'
import { Report } from "@prisma/client"
import useSWR from 'swr'
import { fetcher } from "@/lib/utils";

export default function Home() {
  const { data, error, isLoading } = useSWR("/api/reports", fetcher);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            Latest Reports
          </h2>
          <p className="text-sm text-muted-foreground">
            Latest reports
          </p>
        </div>
      </div>
      <Separator className="my-4" />
      <div className="relative">
        <ScrollArea>
          <div className="flex space-x-4 pb-4">
            {!isLoading && data.map((report: Report) => <ReportComponent key={report.id} report={report} />)}
          </div>
        </ScrollArea>

      </div>
    </div>
  );
}
