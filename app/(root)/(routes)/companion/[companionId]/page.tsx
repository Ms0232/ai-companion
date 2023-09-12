import prismadb from "@/lib/prismadb";
import CompanionForm from "./components/companion-form";
import { auth, redirectToSignIn } from "@clerk/nextjs";

interface CompanionPageProps {
  params: { companionId: string };
}
const CompanionPage = async ({ params }: CompanionPageProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirectToSignIn();
  }

  if (params.companionId === "new") {
    const categories = await prismadb.category.findMany();
    return <CompanionForm initialData={null} categories={categories} />;
  }
  const companion = await prismadb.companion.findUnique({
    where: {
      id: params.companionId,
    },
  });
  const categories = await prismadb.category.findMany();
  return <CompanionForm initialData={companion} categories={categories} />;
};

export default CompanionPage;
