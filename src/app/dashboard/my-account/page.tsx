import { MyAccountForm } from '@/components/my-account';
import Tabs from '@/components/ui/tabs-link';
import { ViewLayout } from '@/layout/view-layout';

const DATA = [
  {
    pathname: "/dashboard/my-account",
    title: "Conta",
    isActive: true,
  },
  {
    pathname: "/dashboard/wallet",
    title: "Carteira",
    isActive: false,
  },
  {
    pathname: "/dashboard/subscription",
    title: "Assinatura",
    isActive: false,
  },
];
export default function MyAccountPage() {
  return (
    <>
      <ViewLayout disableHistoryRoute itemActive="profile">
        <Tabs data={DATA} />
        <MyAccountForm />
      </ViewLayout>
    </>
  );
}
