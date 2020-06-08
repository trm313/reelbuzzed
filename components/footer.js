import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full flex flex-col mt-24">
      <h6 className="text-2xl">Drink responsibly! Do not drink if underage.</h6>
      <p>
        We do not accept any responsibility for over indulgence, irresponsible
        activity, or other such racousness. That's all on you.
      </p>
      <div className="flex flex-wrap items-center justify-between">
        <p className="mt-4">Reel Buzzed © {new Date().getFullYear()}</p>
        <div className="flex items-center text-sm">
          <Link href="/posts/terms-of-service">
            <a className="mr-2">Terms of Service</a>
          </Link>
          <span className="text-2xl text-gray-600">&#183;</span>
          <Link href="/posts/privacy-policy">
            <a className="ml-2">Privacy Policy</a>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
