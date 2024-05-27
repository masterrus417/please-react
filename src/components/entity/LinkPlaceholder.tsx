import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function LinkPlaceholder() {
  return (
    <Stack spacing={1}>
      {
        ...[16, 40, 40].map((height)=><Skeleton variant="rounded" height={height}/>)
      }
    </Stack>
  );
}