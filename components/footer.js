const Footer = () => {
  return (
    <footer className="w-full flex flex-col mt-24">
      <h6 className="text-2xl">Drink responsibly! Do not drink if underage.</h6>
      <p>
        We do not accept any responsibility for over indulgence, irresponsible
        activity, or other such racousness. That's all on you.
      </p>
      <p className="mt-4">Reel Buzzed © {new Date().getFullYear()}</p>
    </footer>
  );
};

export default Footer;
