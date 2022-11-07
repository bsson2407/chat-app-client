import React, { FormEvent, useState } from 'react';
import './update-profile.styles.scss';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/reducers';
import {
  updateAvatarRequest,
  updateProfileRequest,
} from '../../../../redux/actions/UserAction';
import {
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from '@material-ui/core';
import { dateUtils } from '../../../../utils/dateUtils';
import SelectInput from '@material-ui/core/Select/SelectInput';

interface Update {
  open: boolean;
  handleClose: () => void;
}

const UpdateProfile = ({ open, handleClose }: Update) => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const { userCurrent }: any = useSelector<RootState>((state) => state.user);
  const [previewSource, setPreviewSource] = useState<any>('');
  const [image, setImage] = useState('');
  // const [changeName, setChangeName] = useState(false);
  const [name, setName] = useState(userCurrent.name);
  const [gender, setGender] = useState<boolean>(userCurrent.gender);
  const dateOfBirth = new Date(userCurrent.dateOfBirth);

  // const { value } = field;

  // const { day, month, year } = value;

  const [changeDateOfBirth, setChangeDateOfBirth] = useState({
    date: dateOfBirth.getDate(),
    month: dateOfBirth.getMonth() + 1,
    year: dateOfBirth.getFullYear(),
  });

  // const { MenuItem } = Select;
  // console.log(
  //   dateUtils.transferDateUpdate(
  //     changeDateOfBirth.date,
  //     changeDateOfBirth.month,
  //     changeDateOfBirth.year
  //   )
  // );
  console.log(gender);
  const onSubmit = async () => {
    if (image) {
      const formData = new FormData();
      console.log('is1:', formData);
      formData.append('_id', userCurrent._id);
      formData.append('image', image);
      await dispatch(updateAvatarRequest(formData));
    }

    const data = {
      name: name,
      _id: userCurrent._id,
      gender: gender,
      dateOfBirth: dateUtils.transferDateUpdate(
        changeDateOfBirth.date,
        changeDateOfBirth.month,
        changeDateOfBirth.year
      ),
    };
    console.log(data);

    if (data) {
      await dispatch(updateProfileRequest(data));
    }

    handleClose();
  };

  const handerChangeGender = (genderItem: any) => {
    // const upGender: boolean = false;
    genderItem.target.value === 'Nam' ? setGender(false) : setGender(true);
    console.log(gender);
    // setChangeName(gender.target.value);
  };
  const handleFileInputChange = (e: any) => {
    setPreviewSource('');
    const files = e.target.files;

    console.log('file', files);

    const fileImage = files[0];
    const reader = new FileReader();
    if (fileImage && fileImage.type.match('image.*')) {
      reader.readAsDataURL(fileImage);
      reader.onloadend = function (e) {
        setPreviewSource(reader.result);
      };
    }
    setImage(fileImage);

    // setPreviewSource('');

    // const file = e.target.files[0];
    // const reader = new FileReader();
    // reader.readAsDataURL(file);
    // reader.onloadend = () => {
    //   setPreviewSource(reader.result);
    // };
  };
  const renderDays = () => {
    let end = 31;
    const { month, year } = changeDateOfBirth;
    // const month = dateOfBirth.getMonth() + 1;
    // const year = dateOfBirth.getFullYear();

    if (month === 4 || month === 6 || month === 9 || month === 11) end = 30;

    if (month === 2) {
      if (dateUtils.checkLeapYear(year)) end = 29;
      else end = 28;
    }

    const result = [];

    for (let i = 1; i <= end; i++) {
      result.push(<MenuItem value={i}>{i}</MenuItem>);
    }
    return result;
  };

  const renderMonths = () => {
    const result = [];

    for (let i = 1; i <= 12; i++) {
      result.push(
        <MenuItem value={i} disabled={handleMonthDisabled(i)}>
          {i}
        </MenuItem>
      );
    }
    return result;
  };

  const handleMonthDisabled = (month: any) => {
    // const { day, year } = dateOfBirth;
    const day = dateOfBirth.getDate();
    const year = dateOfBirth.getFullYear();
    if (day === 31) {
      if (
        month === 2 ||
        month === 4 ||
        month === 6 ||
        month === 9 ||
        month === 11
      )
        return true;
    }

    if (day === 30 && month === 2) return true;

    if (day === 29 && month === 2 && !dateUtils.checkLeapYear(year))
      return true;
  };

  const renderYears = () => {
    const result = [];

    const yearValid = new Date().getFullYear() - 10;
    for (let i = 1950; i <= yearValid; i++) {
      result.push(<MenuItem value={i}>{i}</MenuItem>);
    }
    return result;
  };

  const handleDayChange = (dayValue: any) => {
    const valueTempt = { ...changeDateOfBirth, date: dayValue.target.value };
    setChangeDateOfBirth(valueTempt);
    // handleValueChange(valueTempt);
  };

  const handleMonthChange = (monthValue: any) => {
    const valueTempt = { ...changeDateOfBirth, month: monthValue.target.value };
    console.log(monthValue.target.value);
    setChangeDateOfBirth(valueTempt);
    // handleValueChange(valueTempt);
  };

  const handleYearChange = (yearValue: any) => {
    const valueTempt = { ...changeDateOfBirth, year: yearValue.target.value };
    setChangeDateOfBirth(valueTempt);
    // handleValueChange(valueTempt);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <form
          className="dialog-update-profile"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="title">
            <span>Cập nhật thông tin</span>
            <div className="close" onClick={() => handleClose()}></div>
          </div>
          <div className="img">
            <img src="https://cover.talk.zdn.vn/default" alt=""></img>
          </div>
          <div className="avatar">
            <div className="img">
              {previewSource.length > 0 ? (
                <img src={previewSource} alt="Red dot" />
              ) : (
                <div>
                  <img src={userCurrent.avatar} alt="avatar"></img>
                </div>
              )}

              <div className="update">
                <label htmlFor="input_file">
                  <i className="fal fa-camera"></i>
                </label>
                <input
                  type="file"
                  id="input_file"
                  {...register('image')}
                  defaultValue=""
                  onChange={handleFileInputChange}
                ></input>
              </div>
            </div>
          </div>
          {/* <div className="email">
            <label>Email: </label>
            <span>{userCurrent.email}</span>
          </div> */}
          <div className="infos">
            <div className="name">
              <input
                type="text"
                defaultValue={userCurrent.name}
                {...register('email')}
                // value={name ? name : userCurrent.name}
                onChange={(e: FormEvent<HTMLInputElement>) =>
                  setName(e.currentTarget.value)
                }
                required
              ></input>
            </div>
            <div className="info">
              <label>Giới tính</label>
              <div>
                <RadioGroup
                  name="gender"
                  aria-labelledby="job-experience"
                  onChange={handerChangeGender}
                >
                  <FormControlLabel
                    control={<Radio />}
                    label="Nam"
                    value="Nam"
                  />
                  <FormControlLabel control={<Radio />} label="Nữ" value="Nữ" />
                </RadioGroup>
              </div>
            </div>
            <div className="info">
              <label>Ngày sinh</label>
              <div>
                <div className="select">
                  <Select
                    defaultValue={dateOfBirth.getDate()}
                    style={{ width: 80 }}
                    onChange={handleDayChange}
                  >
                    {renderDays()}
                  </Select>
                </div>
                <div className="select">
                  <Select
                    defaultValue={dateOfBirth.getMonth() + 1}
                    style={{ width: 80 }}
                    onChange={handleMonthChange}
                  >
                    {renderMonths()}
                  </Select>
                </div>
                <div className="select">
                  <Select
                    defaultValue={dateOfBirth.getFullYear()}
                    style={{ width: 80 }}
                    onChange={handleYearChange}
                  >
                    {renderYears()}
                  </Select>
                </div>
              </div>
            </div>
          </div>
          <div className="btn">
            <button className="cancel" onClick={() => handleClose()}>
              Hủy
            </button>
            <button type="submit" className="search">
              Cập nhật
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfile;
