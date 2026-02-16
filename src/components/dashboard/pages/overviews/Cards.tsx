"use client";
import React from "react";
import { useOverview } from "@/features/dashboard/hooks/useOverview";
import CardOverview from "./CardOverview";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, BookOpen, DollarSign } from "lucide-react";

const Cards = () => {
  const { data, loading, error } = useOverview();

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-40 rounded-xl" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-500 rounded-lg">
        Failed to load dashboard stats.
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <CardOverview
        title="Total Enrolled Students"
        numberInfo={data.totalEnrolledStudents.toLocaleString()}
        trend="+ 36%"
        isUp={true}
        Icon={Users}
      />

      <CardOverview
        title="Total Lessons Completed"
        numberInfo={data.totalLessonsCompleted.toLocaleString()}
        trend="+ 10%"
        isUp={true}
        Icon={BookOpen}
      />

      <CardOverview
        title="Completed Courses"
        numberInfo={data.completedCourses.toLocaleString()}
        trend="+ 20%"
        isUp={true}
        Icon={DollarSign}
      />
    </div>
  );
};

export default Cards;
