let protooPort = process.env.PROTOO_LISTEN_PORT;

if (window.location.hostname === 'test.mediasoup.org')
	protooPort = 4444;

export function getProtooUrl({ roomId, peerId })
{
	const hostname = window.location.hostname;

	return `wss://${hostname}:${protooPort}/?roomId=${roomId}&peerId=${peerId}`;
}
