"use client";

import { selectEmail, selectName } from "../store/features/user/user-slice";
import { useAppSelector } from "../store/hooks";

const Dashboard = () => {
  const userName = useAppSelector(selectName);
  const userEmail = useAppSelector(selectEmail);

  return (
    <div>
      Hello: {userName} with {userEmail}
    </div>
  );
};

export default Dashboard;
