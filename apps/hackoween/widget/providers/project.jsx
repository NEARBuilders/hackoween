const projects = VM.require("hackoween.near/widget/data.projects") || [];

const Children = props.children;

return <Children projects={projects} />;
