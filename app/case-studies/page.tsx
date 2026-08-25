import CaseStudies from "../components/case-studies/CaseStudies";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { getCaseStudies } from "../actions/caseStudyActions";

export default async function CaseStudiesPage() {
  const initialCaseStudies = await getCaseStudies();

  return (
    <>
      <Header />
      <CaseStudies initialCaseStudies={initialCaseStudies} />
      <Footer />
    </>
  );
}