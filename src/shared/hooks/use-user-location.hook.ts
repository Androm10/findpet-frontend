import { userActions } from '@shared/store/slices/user.slice';
import { useAppDispatch } from './app-dispatch.hook';
import { useAppSelector } from './app-selector.hook';

export const useUserLocation = () => {
  const { location } = useAppSelector((state) => state.userReducer);
  const { setLocation } = userActions;
  const dispatch = useAppDispatch();

  const successLocationHandler = (pos: GeolocationPosition) => {
    dispatch(
      setLocation({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      }),
    );
  };

  if (!location) {
    navigator.geolocation.getCurrentPosition(successLocationHandler);
  }

  return location;
};
