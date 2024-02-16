import React from 'react'
import { BsFacebook,BsLinkedin } from "react-icons/bs";
import { BiLogoGmail } from "react-icons/bi";
import { AiFillInstagram, AiFillTwitterCircle ,AiOutlineWhatsApp  } from "react-icons/ai";
const SocialMedial = ({className,facebook,instagram,twitter,linkedin,email,hover,whatsApp}) => {
  return (
    <ul className={`flex justify-center items-center sm:justify-start md:gap-8  ${className}`}>
      <li>
      {facebook?<a target='_blank' href={facebook}> <BsFacebook className={`text-inherit  cursor-pointer h-full w-auto ${hover}`}/></a>:""} 
      </li>
      <li>
      {instagram?<a target='_blank' href={instagram}><AiFillInstagram className={`text-inherit cursor-pointer h-full w-auto ${hover}`} /></a>:""}
      </li>
      <li>
      {twitter?<a target='_blank' href={twitter}><AiFillTwitterCircle className={`cursor-pointer h-full w-auto ${hover}`} /></a>:""}
      </li>
      <li>
      {linkedin?<a target='_blank' href={linkedin} className={`text-inherit cursor-pointer h-full w-auto ${hover}`}><BsLinkedin  /></a>:""}
      </li>
      <li>
      {email?<a target='_blank' href={email} className={`text-inherit cursor-pointer h-full w-auto ${hover}`}> <BiLogoGmail  /></a>:""}
      </li>
      <li>
      {whatsApp?<a target='_blank' href={whatsApp} className={`text-inherit cursor-pointer h-full w-auto ${hover}`}> <AiOutlineWhatsApp  /></a>:""}
      </li>



    </ul>
  )
}

export default SocialMedial
