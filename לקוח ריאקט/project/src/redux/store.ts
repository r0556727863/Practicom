
// import { createStore, combineReducers } from 'redux';

// interface Photo {
//   Url: string;
//   Title: string;
//   CreatedAt: string;
//   UpdatedAt: string;
// }

// interface State {
//   uploadedPhotos: Photo[];
// }

// const initialState: State = {
//   uploadedPhotos: [],
// };

// const photoReducer = (state = initialState, action: any) => {
//   switch (action.type) {
//     case 'ADD_PHOTO':
//       return {
//         ...state,
//         uploadedPhotos: [...state.uploadedPhotos, action.payload],
//       };
//     case 'SET_PHOTOS':
//       return {
//         ...state,
//         uploadedPhotos: action.payload,
//       };
//     default:
//       return state;
//   }
// };

// // Combine reducers if you have more than one
// const rootReducer = combineReducers({
//   photos: photoReducer, // הוסף את ה-reducer שלך כאן
// });

// // הגדרת RootState
// export type RootState = ReturnType<typeof rootReducer>;

// const store = createStore(rootReducer);

// export default store;


import { createStore, combineReducers } from 'redux';

interface Photo {
  photoId: number;
  url: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}


interface State {
  uploadedPhotos: Photo[];
}

const initialState: State = {
  uploadedPhotos: [],
};

const photoReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'ADD_PHOTO':
      return {
        ...state,
        uploadedPhotos: [...state.uploadedPhotos, action.payload],
      };
    case 'SET_PHOTOS':
      return {
        ...state,
        uploadedPhotos: action.payload,
      };
      case 'UPDATE_PHOTO':
        return {
          ...state,
          uploadedPhotos: state.uploadedPhotos.map(photo =>
            photo.photoId === action.payload.photoId
              ? { ...photo, title: action.payload.title }
              : photo
          ),
        };
    case 'DELETE_PHOTO':
      return {
        ...state,
        uploadedPhotos: state.uploadedPhotos.filter(photo => photo.photoId !== action.payload),
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  photos: photoReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer);

export default store;
