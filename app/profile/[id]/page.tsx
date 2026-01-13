const ProfilePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return (
    <div>
      <h1>Profile page</h1>
      <p>id: {id}</p>
    </div>
  );
};

export default ProfilePage;
