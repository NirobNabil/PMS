"use client"

import { Link } from "react-router-dom";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"


export default () => {
  return (
    <div className="flex justify-between" >
      P.M.S

      <NavigationMenu >
        <NavigationMenuList className="justify-self-end" >

          <NavigationMenuItem>
            <Link to="/create_prescription">
              <NavigationMenuTrigger>Create Prescription</NavigationMenuTrigger>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link to="/prescription">
              <NavigationMenuTrigger>Prescription</NavigationMenuTrigger>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link to="/medicines">
              <NavigationMenuTrigger>Medicines</NavigationMenuTrigger>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link to="/appointment">
              <NavigationMenuTrigger>Appointment</NavigationMenuTrigger>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}


