import MyFooter from "../components/Footer/MyFooter";

export default function FooterPage() {
  return (
    <div className="footer">
      <h2 style={{ textAlign: "center" }}>Footer Demo Page</h2>
      <MyFooter
        author="TraLTB"
        email="traltb@fe.edu.vn"
        linkGithub="https://github.com/Ivant0004"
      />
    </div>
  );
}
