export const apiResponse = ({ status, msg, data }) => {
	return new Response(
		`<!DOCTYPE html lang="en">
			<body style="background-color: gray; color: black; width: 100%; padding: 4px; margin: 0;">
				<pre>
					<div style="padding-bottom: 4px">
						<p>${msg}</p>
					</div>
					<div>
						<code>
							${JSON.stringify(data, null, 2)}
						</code>
					</div>	
				</pre>
			</body>
		</html>`,
		{ headers: { 'Content-Type': 'text/html' }, status }
	);
};

export default apiResponse;
