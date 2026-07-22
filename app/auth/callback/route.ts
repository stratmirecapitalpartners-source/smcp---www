import { NextResponse } from 'next/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')

    const next = searchParams.get('next') ?? '/update-password'

    if (code) {
        // You MUST await cookies() in modern Next.js
        const cookieStore = await cookies()

        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    get(name: string) {
                        return cookieStore.get(name)?.value
                    },
                    set(name: string, value: string, options: CookieOptions) {
                        cookieStore.set({ name, value, ...options })
                    },
                    remove(name: string, options: CookieOptions) {
                        cookieStore.delete({ name, ...options })
                    },
                },
            }
        )

        // Exchange the secure code for an active session
        const { error } = await supabase.auth.exchangeCodeForSession(code)

        if (!error) {
            // Success! Send them to the password update UI
            return NextResponse.redirect(`${origin}${next}`)
        }
    }

    // If the link is expired or invalid, send them back to login with an error
    return NextResponse.redirect(`${origin}/login?error=Invalid_Token`)
}