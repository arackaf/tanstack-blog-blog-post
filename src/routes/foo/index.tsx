import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/foo/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      Hello foo! <Link to="/">Home</Link>
    </div>
  );
}
