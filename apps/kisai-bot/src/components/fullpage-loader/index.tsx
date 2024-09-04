import { FullPageLoader } from '@samagra-x/stencil-molecules/lib/fullpage-loader';

interface FullPageLoaderProps {
  loading: boolean;
  color?: string;
  label?: string;
}

export const ImportedFullPageLoader: React.FC<FullPageLoaderProps> = ({
  loading,
  color,
  label,
}) => <FullPageLoader loading={loading} color={color} label={label} />;
