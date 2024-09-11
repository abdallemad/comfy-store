import Link from "next/link";
import { VscCode } from "react-icons/vsc";
import { Button } from "../ui/button";
const Logo = () => {
  return (
    <Button asChild size={'icon'}>
      <Link href={'/'}>
      <VscCode className="h-6 w-6" />
      </Link>
    </Button>
  )
}

export default Logo
