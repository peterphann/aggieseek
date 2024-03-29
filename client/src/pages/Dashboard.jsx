const Dashboard = () => {
  return (
    <div>
    <div class="flex justify-center items-center mt-[3%]"> {/* Fullscreen container for vertical & horizontal centering */}
      <div class="flex items-center justify-center w-full max-w-4xl px-4 relative"> {/* Content container */}
        <h2 class="text-3xl font-bold absolute w-full text-center">Sections I'm Watching</h2> {/* Absolutely positioned to center */}
        <div class="flex justify-end w-full"> {/* Container for right-aligned items */}
          <h2 class="text-sm font-medium text-[#8d0509]">Add New Section</h2>
          <h2 class="text-sm font-medium ml-4 text-[#8d0509]">Edit</h2>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Dashboard;