import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  courseTitle: '',
  courseDescription: '',
  thumbnail: null,            // File
  thumbnailUrl: '',           // Preview URL
  coursePrice: {
    validityType: '',
    duration: 0,
    durationUnit: '',
    price: 0,
    discount: 0,
    effectivePrice: 0
  },
  courseFolders: []
};

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    setBasicInfo: (state, action) => {
      const { title, description, thumbnail } = action.payload;
      state.courseTitle = title;
      state.courseDescription = description;
      state.thumbnail = thumbnail;
      state.thumbnailUrl = thumbnail ? URL.createObjectURL(thumbnail) : '';
    },
    setCoursePrice: (state, action) => {
      const { validityType, duration, durationUnit, price, discount } = action.payload;
      state.coursePrice = {
        validityType,
        duration,
        durationUnit,
        price,
        discount,
        effectivePrice: Math.max(0, price - discount)
      };
    },
    setCourseFolders: (state, action) => {
      state.courseFolders = action.payload;
    },
    resetCourse: () => initialState
  }
});

export const { setBasicInfo, setCoursePrice, setCourseFolders, resetCourse } = courseSlice.actions;
export default courseSlice.reducer;
