import Button from "react-bootstrap/Button";
import "./Footer.css";

export default function MyFooter({ author, email, linkGithub }) {
  return (
    <footer>
      <p>Author: {author}</p>
      <p>Created by: {email}</p>
      <p>&copy; {new Date().getFullYear()} {author}. All rights reserved.</p>
      <Button variant="link" href="https://github.com/Ivant0004 " target="_blank" rel="noopener noreferrer">
        My Link Github: {linkGithub}
      </Button>
    </footer>
  );
}
