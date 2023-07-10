import type { RequestHandler } from './$types';
import { existsSync } from 'fs';
import { execSync, spawnSync } from 'child_process';
import { resolve } from 'path';
import { error, json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({url}) => {
    const client = url.searchParams.get('client')!

    // check if client name is taken
    if (existsSync(resolve(`/etc/openvpn/server/easy-rsa/pki/issued/${client}.crt`))) {
        throw error(409, 'Profile with this name already exists')
    }

    // gen keys and conf
    try {
        spawnSync('./easyrsa', ['--batch', '--days=3650', 'build-client-full', client, 'nopass'], { cwd: '/etc/openvpn/server/easy-rsa/' });
    
const ovpnContent = `
${execSync('cat /etc/openvpn/server/client-common.txt')}
<ca>
${execSync('cat /etc/openvpn/server/easy-rsa/pki/ca.crt')}
</ca>
<cert>
${execSync(`sed -ne '/BEGIN CERTIFICATE/,$ p' /etc/openvpn/server/easy-rsa/pki/issued/${client}.crt`)}
</cert>
<key>
${execSync(`cat /etc/openvpn/server/easy-rsa/pki/private/${client}.key`)}
</key>
<tls-crypt>
${execSync(`sed -ne '/BEGIN OpenVPN Static key/,$ p' /etc/openvpn/server/tc.key`)}
</tls-crypt>
`;
    
    // returb .ovpn file
    return new Response(ovpnContent, {
        status: 200,
        headers: {
            'Content-Type': 'application/x-openvpn-profile',
            'Content-Disposition': `attachment; filename="${client}.ovpn"`
        }
    });
    
    } catch {
        throw error(500, 'internal server error')
    }
};

export const DELETE: RequestHandler = async ({url}) => {
    const client = url.searchParams.get('client')!

    // check if client exists
    if (!existsSync(resolve(`/etc/openvpn/server/easy-rsa/pki/issued/${client}.crt`))) {
        throw error(404, 'Profile not found')
    }

    try {
        spawnSync('./easyrsa', ['--batch', 'revoke', client], { cwd: '/etc/openvpn/server/easy-rsa/' });

        return(json({ status: 'client deleted' }))
    } catch {
        throw error(500, 'internal server error')
    }
}