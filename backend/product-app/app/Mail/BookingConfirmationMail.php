<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Address; // Uso correcto para direcciones de correo
use Faker\Factory as Faker;

class BookingConfirmationMail extends Mailable
{
    use Queueable, SerializesModels;

    public $booking;


    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($booking)
    {
        $this->booking = $booking;



    }

    /**
     * Build the message envelope.
     *
     * @return \Illuminate\Mail\Mailables\Envelope
     */
    public function envelope()
    {
        return new Envelope(
            from: new Address('admin@ariseweb.com', 'Arise'), // Uso correcto de Address
            subject: 'Revisa el email de tu reserva con Arise!'
        );
    }

    /**
     * Build the message content definition.
     *
     * @return \Illuminate\Mail\Mailables\Content
     */
    public function content()
    {
        return new Content(
            view: 'emails.booking_confirmation',
            with: [
                'booking' => $this->booking
            ]
        );
    }
}
