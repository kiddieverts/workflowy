import StepTemplate from "./StepTemplate";

const NotImplemented = () => {
  return <StepTemplate question="Not implemented" onContinue={() => { }}>
    <div className="p-4">
      No view for this feature yet.
    </div>
  </StepTemplate>
}
export default NotImplemented;