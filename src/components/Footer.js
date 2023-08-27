function Footer() {
  const date = Date.now();
  const currentDate = new Date(date);
  const currentYear = currentDate.getFullYear();

  return (
    <footer className="flex justify-between py-2 px-48">
      <p>Created by Daniel Ndanema</p>
      <p>Copyright &copy; {currentYear}</p>
    </footer>
  );
}

export default Footer;
