<?php

declare(strict_types=1);

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 */
class Contact
{
    /**
     * @var int
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    public $id;

    /**
     * @var string
     * @ORM\Column(type="string")
     */
    public $firstname;

    /**
     * @var string
     * @ORM\Column(type="string")
     */
    public $lastname;

    /**
     * @var string
     * @ORM\Column(type="string")
     */
    public $email;
}
