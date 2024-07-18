import ViewCourse from '@/components/view-course';

export default function CoursePage({
  params
}: {
  params?: { [key: string]: string | undefined };
}) {
  return <ViewCourse id={params?.id ?? ""}  />;
}
