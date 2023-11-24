import Button from "../Button";
import { Tab } from "../EditModal/types";
import { AboutTextArea } from "./AboutTextArea";
import { AvatarField } from "./AvatarField";
import { InputField } from "./InputField";
import { EditErrors } from "./formTypes";
import { useEffect, useState } from "react";

import { SocialInput } from "./SocialInput";
import { FormSubmit, TextAreaChange, TextFieldChange } from "../../types";
import { UserData } from "../../store/types";
import { deleteIcon, setUserSocials } from "../../utils/social";
import { useAppDispatch } from "../../store/createStore";
import { editUser, getAuthError, getAuthLoading } from "../../store/auth";
import { useSelector } from "react-redux";
import { Loader } from "../Loader";
import { validator } from "../../utils/Validator/validator";
import { editValidator } from "../../utils/Validator/validatorConfig";

export const EditForm: React.FC<{ tab: Tab; user: UserData }> = ({
  tab,
  user,
}) => {
  const [data, setData] = useState<UserData>(user);
  const [image, setImage] = useState<File | undefined>();
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getAuthLoading());
  const [imagePreview, setImagePreview] = useState<string>("");
  const [imageError, setImageError] = useState<string>();
  const [errors, setErrors] = useState<EditErrors>();
  const [socials, setSocials] = useState(setUserSocials(user.social || []));
  const handleSocials = (e: TextFieldChange) => {
    const links = [...socials];
    const index = links.findIndex((l) => l.name === e.target.name);
    links[index].value = e.target.value;
    setSocials(links);
  };
  const handleChange = ({ target }: TextFieldChange | TextAreaChange) => {
    setData((prev) => {
      return { ...prev, [target.name]: target.value };
    });
  };
  const authError = useSelector(getAuthError());
  useEffect(() => {
    if (typeof authError === "object" && authError) {
      setErrors(authError);
    }
  }, [authError]);
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files![0];
    if (!file) {
      return;
    }
    if (file.size >= 3125576) {
      setImageError("Max File Size is 3mb");
      return;
    }
    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
    if (!allowedExtensions.exec(file.name)) {
      setImageError(
        "Invalid file type. Only JPG, JPEG, and PNG files are allowed."
      );
      return;
    }
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
    setImageError("");
  };

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault();
    const error = validator(
      { email: data.email, username: data.username },
      editValidator
    );
    if (Object.keys(error).length > 0 || imageError) {
      setErrors(error);
      return;
    }
    const updatedData = { ...data, social: deleteIcon(socials) };
    dispatch(editUser(updatedData, image));
  };
  const renderForms = () => {
    switch (tab) {
      case "personal":
        return (
          <>
            <InputField
              label="Email"
              name="email"
              placeholder=""
              value={data.email}
              error={errors?.email}
              onChange={handleChange}
            />
            <InputField
              label="Username"
              name="username"
              placeholder=""
              value={data.username}
              error={errors?.username}
              onChange={handleChange}
            />
            <AvatarField
              error={imageError}
              onChange={handleImage}
              image={imagePreview || user.image || ""}
            />
            <InputField
              label="City"
              name="city"
              placeholder="Where are you from?"
              value={data?.city || ""}
              onChange={handleChange}
            />
            <InputField
              label="Phone"
              name="phone"
              placeholder="Phone Number?"
              value={data?.phone || ""}
              onChange={handleChange}
            />
            <InputField
              label="Website"
              name="website"
              placeholder="https://"
              value={data?.website || ""}
              onChange={handleChange}
            />
          </>
        );
      case "about":
        return (
          <AboutTextArea
            name="about"
            label="Write a few words that describe you"
            placeholder=""
            value={data?.about || ""}
            onChange={handleChange}
          />
        );
      case "social":
        return socials.map((s, i) => (
          <SocialInput
            key={s.name + i}
            placeholder={s.name}
            name={s.name}
            value={s.value}
            Icon={<s.Icon />}
            onChange={handleSocials}
          />
        ));
      default:
        break;
    }
  };
  return (
    <form onSubmit={handleSubmit} className="p-4 md:p-5">
      {renderForms()}
      {isLoading ? <Loader size={30} /> : <Button type="submit" text="Save" />}
    </form>
  );
};
