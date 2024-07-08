import React, { useEffect, useState } from "react";
import { ReactComponent as InstagramIcon } from "../../assets/socialmedia/Instagram.svg";
import { ReactComponent as TiktokIcon } from "../../assets/socialmedia/TikTok.svg";
import { ReactComponent as FacebookIcon } from "../../assets/socialmedia/facebook.svg";
import { ReactComponent as CSIcon } from "../../assets/socialmedia/mdi_virtual-meeting.svg";
import { ReactComponent as PlaystoreIcon } from "../../assets/socialmedia/playstore_light.svg";
import { ReactComponent as WAIcon } from "../../assets/socialmedia/whatapps.svg";
import { ReactComponent as XIcon } from "../../assets/socialmedia/x.svg";

import useTheme from "../context/useTheme";
import LoadingLink from "../common/LoadingLink";

const Footer = () => {
  const { isDarkMode } = useTheme();
  const [status, setStatus] = useState(null);
  const { hostname } = window.location;

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const storedStatus = localStorage.getItem("isLogin");
      setStatus(storedStatus);
    }
  }, []);

  return (
    <footer className="flex sm:flex-row flex-col justify-between transition duration-300 ease-in-out mx-auto w-full items-center font-gilroy p-3 px-4 bg-lightColor dark:bg-cardDark border-[1px] border-[#dddddd] dark:border-[#ffffff20]" >
      <span className="text-sm opacity-70">COPYRIGHT © 2024 Diskominfo All rights Reserved

      </span>
      <span className="text-sm opacity-70">Hand-crafted & Made by TIM PMO</span>
    </footer>
  );
};

export default Footer;
