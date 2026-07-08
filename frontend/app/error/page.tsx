type ErrorPageProps = {
	statusCode?: number;
	errorMessage?: string;
};

export default function ErrorPage({ statusCode }: ErrorPageProps) {
	return <div>{statusCode || 'Đã xảy ra lỗi'}</div>;
}
