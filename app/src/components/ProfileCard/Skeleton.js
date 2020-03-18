import Box from '@material-ui/core/Box'
import Skeleton from '@material-ui/lab/Skeleton'

export default function CardSkeleton() {
  return (
    <Box display='flex' justifyContent='center' paddingTop='24px'>
      <Skeleton variant='rect' height={550} width={350} />
    </Box>
  )
}
