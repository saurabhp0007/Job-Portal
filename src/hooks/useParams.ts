"use client";
import { useSearchParams } from "next/navigation";

const useParams = () => {
  const params = useSearchParams();
  const page = params.get("page") || 1;
  const per_page = params.get("per_page") || 10;
  const location = params.get("location") || "all";
  const salary = params.get("salary") || "any";
  // const date = params.get("date") || "any"
  const category = params.get("category") || "";
  const search = params.get("search") || "";
  const organization = params.get("organization") || "";
  const experience = params.get("experience") || "any";
  const employmentType = params.get("employmentType") || "any";

  return {
    page,
    per_page,
    location,
    salary,
    category,
    search,
    organization,
    experience,
    employmentType,
  };
};

export default useParams;
