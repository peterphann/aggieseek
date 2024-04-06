import { Input } from "../components/input";
import { Switch } from "../components/switch";
const Settings = () => {
  // TODO: create course tracking settings as shown in figma
  // make sure to remove the h1 :)
  return (
    <div>
      <div class="flex justify-center  mt-[3%]">
      <h2 class="text-3xl font-bold absolute w-full text-center">Settings</h2>
      </div>
      <div class="px-[15%] flex justify-between mt-10">
        <div class="flex flex-col">
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
        <div class="flex flex-col">
          <p class="font-bold text-xl">Desired Display Mode</p>
          <div class="mt-2 flex items-center space-x-2">
            <p class="text-md font-medium">Light Mode</p>
            <Switch/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;