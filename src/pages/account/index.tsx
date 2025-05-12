// import AccountSidebar from "@/components/common/AccountSidebar/AccountSidebar";
import ActiveAds from "./active-ads";

interface AccountProps {
  id: string;
}

const Account: React.FC<AccountProps> = ({ id }) => {
  console.log(id);

  // return <AccountSidebar sidebarOpen={false} />;
  return <ActiveAds />;
};

export default Account;
