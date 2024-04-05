import { Input } from "../components/input";
const Settings = () => {
  // TODO: create course tracking settings as shown in figma
  // make sure to remove the h1 :)
  return (
    <div>
      <div class="flex justify-center  mt-[3%]">
      <h2 class="text-3xl font-bold absolute w-full text-center">Settings</h2>
      </div>
      <div class="px-[10%] flex items-center justify-between mt-10">
        <div>
          <p class="font-bold text-xl">Notification Contact Information</p>
          <div class="">
            <p class="text-md font-medium mt-1">Phone</p>
            <Input placeholder="123-456-7890"/>
            <p class="text-md font-medium mt-0.5">Email</p>
            <Input placeholder="user@gmail.com"/>
            <p class="text-md font-medium mt-0.5">Discord</p>
            <Input placeholder="urdiscordusername"/>
          </div>
        </div>
        <p class="font-bold text-xl">Display Mode</p>
      </div>
    </div>
  );
}

export default Settings;