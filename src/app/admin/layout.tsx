import AntdContainer from "./_components/AntdContainer";

const AdminLayout = ({ children }: any) => {
  return (
    <div className="admin-main">
      <AntdContainer>{children}</AntdContainer>
    </div>
  );
};

export default AdminLayout;
