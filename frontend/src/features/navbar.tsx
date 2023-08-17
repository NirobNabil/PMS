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
            <Link to="/prescriptions">
              <NavigationMenuTrigger>Prescription</NavigationMenuTrigger>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Medicines</NavigationMenuTrigger>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}


